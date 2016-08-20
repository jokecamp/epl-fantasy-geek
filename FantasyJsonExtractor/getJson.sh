#!/bin/bash

# $1 = user email
# $2 = passworld

ruby get.rb $1 $2 "../app/js/static-data.json" "../app/js/dynamic-data.json"
