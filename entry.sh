#!/bin/sh
export RAC_AUTHORITY=${RAC_AUTHORITY}
export RAC_CLIENTID=${RAC_CLIENTID}
export WMS_UNIDADE=${WMS_UNIDADE}
export WMS_UNIDADE_QUERY=${WMS_UNIDADE_QUERY}
export WMS_ENDERECO=${WMS_ENDERECO}
export WMS_DOCUMENTO=${WMS_DOCUMENTO}
export WMS_DOCUMENTO_QUERY=${WMS_DOCUMENTO_QUERY}
export WMS_RECEBIMENTO=${WMS_RECEBIMENTO}
export WMS_RECEBIMENTO_QUERY=${WMS_RECEBIMENTO_QUERY}
export WMS_ESTOQUE=${WMS_ESTOQUE}
export WMS_ESTOQUE_QUERY=${WMS_ESTOQUE_QUERY}
export WMS_EXPEDICAO=${WMS_EXPEDICAO}
export WMS_EXPEDICAO_QUERY=${WMS_EXPEDICAO_QUERY}
export WMS_SELECAO_ESTOQUE=${WMS_SELECAO_ESTOQUE}
export WMS_SEPARACAO=${WMS_SEPARACAO}
export WMS_CONFERENCIA_EXP=${WMS_CONFERENCIA_EXP}

sed -i "s,PLACE_HOLDER_RAC_AUTHORITY,${RAC_AUTHORITY}," /sources/wms/assets/data/appConfig.json
sed -i "s,PLACE_HOLDER_RAC_CLIENTID,${RAC_CLIENTID}," /sources/wms/assets/data/appConfig.json
sed -i "s,PLACE_HOLDER_WMS_UNIDADE_CORE,${WMS_UNIDADE}," /sources/wms/assets/data/appConfig.json
sed -i "s,PLACE_HOLDER_WMS_UNIDADE_QUERY,${WMS_UNIDADE_QUERY}," /sources/wms/assets/data/appConfig.json
sed -i "s,PLACE_HOLDER_WMS_ENDERECO_CORE,${WMS_ENDERECO}," /sources/wms/assets/data/appConfig.json
sed -i "s,PLACE_HOLDER_WMS_DOCUMENTO_CORE,${WMS_DOCUMENTO}," /sources/wms/assets/data/appConfig.json
sed -i "s,PLACE_HOLDER_WMS_DOCUMENTO_QUERY,${WMS_DOCUMENTO_QUERY}," /sources/wms/assets/data/appConfig.json
sed -i "s,PLACE_HOLDER_WMS_RECEBIMENTO_CORE,${WMS_RECEBIMENTO}," /sources/wms/assets/data/appConfig.json
sed -i "s,PLACE_HOLDER_WMS_RECEBIMENTO_QUERY,${WMS_RECEBIMENTO_QUERY}," /sources/wms/assets/data/appConfig.json
sed -i "s,PLACE_HOLDER_WMS_ESTOQUE_CORE,${WMS_ESTOQUE}," /sources/wms/assets/data/appConfig.json
sed -i "s,PLACE_HOLDER_WMS_ESTOQUE_QUERY,${WMS_ESTOQUE_QUERY}," /sources/wms/assets/data/appConfig.json
sed -i "s,PLACE_HOLDER_WMS_EXPEDICAO_CORE,${WMS_EXPEDICAO}," /sources/wms/assets/data/appConfig.json
sed -i "s,PLACE_HOLDER_WMS_EXPEDICAO_QUERY,${WMS_EXPEDICAO_QUERY}," /sources/wms/assets/data/appConfig.json
sed -i "s,PLACE_HOLDER_WMS_SELECAO_ESTOQUE_CORE,${WMS_SELECAO_ESTOQUE}," /sources/wms/assets/data/appConfig.json
sed -i "s,PLACE_HOLDER_WMS_SEPARACAO_CORE,${WMS_SEPARACAO}," /sources/wms/assets/data/appConfig.json
sed -i "s,PLACE_HOLDER_WMS_CONFERENCIA_EXP_CORE,${WMS_CONFERENCIA_EXP}," /sources/wms/assets/data/appConfig.json

exec "$@"
