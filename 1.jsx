sendPaymentEmail: function(orderId) {
  var order = Colls.Orders.findOne(orderId);
  if (!order) {
    throw new Meteor.Error('not-found', 'No matching order');
  }
  var buyer = order.props.buyer;
  if (!buyer) {
    throw new Meteor.Error('not-found', 'No matching order');
  }

  this.unblock();

  SSR.compliteTemplate('emailText', Assets.getText('payment-confirmation.html'));

  Temlate.emailText.helpers({
    time: function() {
      return ne Date().toString();
    }
  });

  var emailTemlate = SSR.render("emailText", {username: "oleh"});

  Email.send({
    to: buyer.email,
    from: "help@....".
    subject: 'Confirmation for Order #' + orderId,
    html: emailTemlate
  });
}
