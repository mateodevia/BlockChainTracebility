#!/bin/bash

API="org1-api1"
cd ./${API}
docker build -t le999/${API}-mateo:1.0 .
cd -

API="org2-api1"
cd ./${API}
docker build -t le999/${API}-mateo:1.0 .
cd -
