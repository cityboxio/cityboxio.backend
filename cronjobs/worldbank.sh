#!/bin/sh 

#jq -R -s -f csv2json.jq $1
#awk -F "\"*,\"*" '{print $4,$5,$6}'  API_EGY_DS2_en_csv_v2_10086258.csv
#input=$1
#awk -F "\"*,\"*" '{print $1,$2}'  API_EGY_DS2_en_csv_v2_10086258.csv
#awk -F "\"*,\"*" '{print $4,$5}'  API_EGY_DS2_en_csv_v2_10086258.csv
awk -F '\"*,\"*' '{print $1,"::",$2,"::", $3,"::", $4,"::", $5,"::", $6,"::", $7,"::", $8,"::", $9,"::", $10,"::", $11,"::", $12,"::", $13,"::", $14,"::", $15,"::", $16,"::", $17,"::", $18,"::", $19,"::", $20,"::"}'  ./../DATA.samples/API_EGY_DS2_en_csv_v2_10086258.csv
