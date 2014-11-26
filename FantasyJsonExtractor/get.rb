require 'mechanize'
# additionally we can use logger to log mechanize actions
require 'logger'

agent = Mechanize.new
# additionally configure logger
agent.log = Logger.new "mechanize.log"

page  = agent.get "https://users.premierleague.com/PremierUser/account/login.html"

ARGV.each do|a|
  puts "Argument: #{a}"
end

# Fill out the login form
form  = page.form_with :id => 'login_form'
form['j_username']    = ARGV[0]
form['j_password']    = ARGV[1]
form.submit

page = agent.get 'http://fantasy.premierleague.com/transfers/'

# $("#ismJson script").text()
div = page.at '#ismJson'

fp = File.new(ARGV[2], "w")
fp.write(div.text.strip)

# put to console to make the user feel good
puts div.text.strip
