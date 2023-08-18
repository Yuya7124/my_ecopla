#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate

if [ -f "run_db_seed.flag" ]; then
  bundle exec rails db:seed
  rm run_db_seed.flag
fi
