#!/bin/bash

npm run build
docker build -t control-center .
