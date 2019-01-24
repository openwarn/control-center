#!/bin/bash

npm test && npm run lint && npm run build && docker build -t control-center .
