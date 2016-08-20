require 'mechanize'
# additionally we can use logger to log mechanize actions
require 'logger'

agent = Mechanize.new
# additionally configure logger
agent.log = Logger.new "mechanize.log"

agent.agent.http.verify_mode = OpenSSL::SSL::VERIFY_NONE

page  = agent.get "https://fantasy.premierleague.com/"

ARGV.each do|a|
  puts "Argument: #{a}"
end

# Fill out the login form
form  = page.form_with :class => 'ism-form ism-form--login'
form['ismjs-username']    = ARGV[0]
form['ismjs-password']    = ARGV[1]
form.submit

page = agent.get 'https://fantasy.premierleague.com/drf/bootstrap-static'
fp = File.new(ARGV[2], "w")
fp.write(page.body)
# put to console to make the user feel good
puts page.body


page = agent.get 'https://fantasy.premierleague.com/drf/bootstrap-dynamic'
fp = File.new(ARGV[3], "w")
fp.write(page.body)
# put to console to make the user feel good
puts page.body


$i = 1;
while $i < 39  do

    $path = "../data/events/event" + $i.to_s + ".json"
    puts "downloading event " + $i.to_s + " to " + $path
    page = agent.get "https://fantasy.premierleague.com/drf/fixtures/?event=" + $i.to_s
    fp = File.new($path, "w")
    fp.write(page.body)

    $i +=1
end
