import { IEMASKS } from './inscricaoestadual';
import { isArray } from 'util';
import { processCaretTraps } from '../utils/utils';

export const MASKS = {
    cpf: {
        text: '000.000.000-00',
        textMask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    },
    cnpj: {
        text: '00.000.000/0000-00',
        textMask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    },
    inscricaoestadual: IEMASKS,
    utils: {
        numberToString: (n: number) => {
            if (!n || typeof n === 'string') {
                return n;
            }
            return (n.toString()).replace('.', ',');
        }
    }
};


const makeGeneric = (key: string) => {
    return (value: string) => {
        if (!value) {
            return '';
        }

        let mask = MASKS[key].textMask;
        if (MASKS[key].textMaskFunction) {
            mask = MASKS[key].textMaskFunction(value);
        }
        return conformToMask(
            value,
            mask,
            { guide: false }
        ).conformedValue;
    };
};

export const maskBr = {
    cpf: makeGeneric('cpf'),
    cnpj: makeGeneric('cnpj'),
    inscricaoestadual: (inscricaoestadualValue: string, estado: string | number) => {
        if (!inscricaoestadualValue || !estado || !MASKS.inscricaoestadual[estado] ||
            !MASKS.inscricaoestadual[estado].textMask) {
            return '';
        }
        return conformToMask(
            inscricaoestadualValue,
            MASKS.inscricaoestadual[estado].textMask,
            { guide: false }
        ).conformedValue;
    }
};

export const placeholderChar = '_';
export const strFunction = 'function';

const defaultPlaceholderChar = placeholderChar;
const emptyArray: any = [];
const emptyString = '';

export function conformToMask(rawValue = emptyString, mask = emptyArray, config: any = {}) {
    if (!isArray(mask)) {
        if (typeof mask === strFunction) {
            mask = mask(rawValue, config);
            mask = processCaretTraps(mask).maskWithoutCaretTraps;
        } else {
            throw new Error(
                'Text-mask:conformToMask; The mask property must be an array.'
            );
        }
    }

    const guide = config.guide;
    const previousConformedValue = config.previousConformedValue || emptyString;
    const placeholder = convertMaskToPlaceholder(mask, placeholderChar);
    const currentCaretPosition = config.currentCaretPosition;
    const keepCharPositions = config.keepCharPositions;

    const suppressGuide = guide === false && previousConformedValue !== undefined;

    const rawValueLength = rawValue.length;
    const previousConformedValueLength = previousConformedValue.length;
    const placeholderLength = placeholder.length;
    const maskLength = mask.length;

    const editDistance = rawValueLength - previousConformedValueLength;

    const isAddition = editDistance > 0;

    const indexOfFirstChange = currentCaretPosition + (isAddition ? -editDistance : 0);

    const indexOfLastChange = indexOfFirstChange + Math.abs(editDistance);
    if (keepCharPositions === true && !isAddition) {
        let compensatingPlaceholderChars = emptyString;

        for (let i = indexOfFirstChange; i < indexOfLastChange; i++) {
            if (placeholder[i] === placeholderChar) {
                compensatingPlaceholderChars += placeholderChar;
            }
        }

        rawValue = (
            rawValue.slice(0, indexOfFirstChange) +
            compensatingPlaceholderChars +
            rawValue.slice(indexOfFirstChange, rawValueLength)
        );
    }

    const rawValueArr = rawValue
        .split(emptyString)
        .map((char, i) => ({ char, isNew: i >= indexOfFirstChange && i < indexOfLastChange }));

    for (let i = rawValueLength - 1; i >= 0; i--) {
        const { char } = rawValueArr[i];

        if (char !== placeholderChar) {
            const shouldOffset = i >= indexOfFirstChange && previousConformedValueLength === maskLength;

            if (char === placeholder[(shouldOffset) ? i - editDistance : i]) {
                rawValueArr.splice(i, 1);
            }
        }
    }

    let conformedValue = emptyString;
    let someCharsRejected = false;

    placeholderLoop: for (let i = 0; i < placeholderLength; i++) {
        const charInPlaceholder = placeholder[i];

        if (charInPlaceholder === placeholderChar) {
            if (rawValueArr.length > 0) {
                while (rawValueArr.length > 0) {
                    const shift = rawValueArr.shift();
                    let rawValueChar = '';
                    let isNew = false;
                    if (shift) {
                        rawValueChar = shift.char;
                        isNew = shift.isNew;
                    }

                    if (rawValueChar === placeholderChar && suppressGuide !== true) {
                        conformedValue += placeholderChar;

                        continue placeholderLoop;

                    } else if (mask[i].test(rawValueChar)) {
                        if (
                            keepCharPositions !== true ||
                            isNew === false ||
                            previousConformedValue === emptyString ||
                            guide === false ||
                            !isAddition
                        ) {
                            conformedValue += rawValueChar;
                        } else {
                            const rawValueArrLength = rawValueArr.length;
                            let indexOfNextAvailablePlaceholderChar = null;

                            for (let contador = 0; contador < rawValueArrLength; contador++) {
                                const charData = rawValueArr[contador];

                                if (charData.char !== placeholderChar && charData.isNew === false) {
                                    break;
                                }

                                if (charData.char === placeholderChar) {
                                    indexOfNextAvailablePlaceholderChar = contador;
                                    break;
                                }
                            }

                            if (indexOfNextAvailablePlaceholderChar !== null) {
                                conformedValue += rawValueChar;
                                rawValueArr.splice(indexOfNextAvailablePlaceholderChar, 1);

                            } else {
                                i--;
                            }
                        }

                        continue placeholderLoop;
                    } else {
                        someCharsRejected = true;
                    }
                }
            }

            if (suppressGuide === false) {
                conformedValue += placeholder.substr(i, placeholderLength);
            }
            break;
        } else {
            conformedValue += charInPlaceholder;
        }
    }

    if (suppressGuide && isAddition === false) {
        let indexOfLastFilledPlaceholderChar = null;

        for (let i = 0; i < conformedValue.length; i++) {
            if (placeholder[i] === placeholderChar) {
                indexOfLastFilledPlaceholderChar = i;
            }
        }

        if (indexOfLastFilledPlaceholderChar !== null) {
            conformedValue = conformedValue.substr(0, indexOfLastFilledPlaceholderChar + 1);
        } else {
            conformedValue = emptyString;
        }
    }
    return { conformedValue, meta: { someCharsRejected } };
}

export function convertMaskToPlaceholder(mask = emptyArray, placeholder = defaultPlaceholderChar) {
    if (!isArray(mask)) {
        throw new Error(
            'Text-mask:convertMaskToPlaceholder; The mask property must be an array.'
        );
    }

    if (mask.indexOf(placeholder) !== -1) {
        throw new Error(
            'Placeholder character must not be used as part of the mask. Please specify a character ' +
            'that is not present in your mask as your placeholder character.\n\n' +
            `The placeholder character that was received is: ${JSON.stringify(placeholder)}\n\n` +
            `The mask that was received is: ${JSON.stringify(mask)}`
        );
    }

    return mask.map((char: any) => {
        return (char instanceof RegExp) ? placeholder : char;
    }).join('');
}
