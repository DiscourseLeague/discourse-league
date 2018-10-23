require_relative '../../../lib/procourse_memberships/gateways/braintree'
require_relative '../../../lib/procourse_memberships/gateways/paypal'

module ProcourseMemberships
  class WebhookController < ApplicationController
    skip_before_action :redirect_to_login_if_required
    layout false
    skip_before_action :check_xhr
    skip_before_action :verify_authenticity_token, only: [:braintree, :paypal]
    def braintree
      braintree = ProcourseMemberships::Gateways::BraintreeGateway.new()
      braintree.parse_webhook(request)
      render body: nil
    end
    def paypal
      paypal = DiscourseLeague::Gateways::PayPalGateway.new()
      paypal.parse_webhook(request)
      render body: nil
    end

  end
end