class SlackTestJob < ApplicationJob
  require 'slack-notifier'
  queue_as :default

  def perform(action, args)
    payload = "#{args.name} with #{args.ingredients}"

    notifier = Slack::Notifier.new Rails.application.credentials.development.slack.test01

    case action
    when 'created'
      notifier.ping "#{payload} is created"
    when 'deleted'
      notifier.ping "#{payload} is deleted"
    else
      notifier.ping "#{payload} is without action"
    end
  end
end
