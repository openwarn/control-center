#!/bin/bash

npm test && npm run build && docker build -t control-center .
