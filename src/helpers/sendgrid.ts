import sgMail from '@sendgrid/mail';

sgMail.setApiKey(
  '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'
);

export const sendEmail = async (email: any) => {
  return sgMail.send(email);
};

export const sendEmailBuyOrder = async (order: any) => {
  console.log(order);

  const emailClient = {
    to: order.emailTo,
    from: {
      name: 'Tiny store',
      email: 'geratobe3@gmail.com'
    },
    cc: 'geratobe3@gmail.com',
    headers: { Priority: 'Urgent', Importance: 'high' },
    templateId: 'd-6cd9142393cf47f18095389ff8f887a4',
    dynamicTemplateData: {
      subject: `Thank you for your order!`,
      products: order.products,
      user: order.user,
      discount: order.discount,
      ordenNumber: order.ordenNumber,
      discountAmount: order.discountAmount,
      total: order.total
    }
  };

  return sgMail.send(emailClient);
};

export const sendEmailResetPassword = async (data: any) => {
  const emailClient = {
    to: data.email,
    from: {
      name: 'Tiny store | Change Password',
      email: 'geratobe3@gmail.com'
    },
    cc: 'geratobe3@gmail.com',
    headers: { Priority: 'Urgent', Importance: 'high' },
    templateId: 'd-778d6900d33d4392974b2267ff489560',
    dynamicTemplateData: {
      subject: `Change Password`,
      token: data.token
    }
  };

  return sgMail.send(emailClient);
};

export const sendEmailChangePasswordConfirmation = async (email: string) => {
  const emailClient = {
    to: email,
    from: {
      name: 'Tiny store | Change Password Confirmation',
      email: 'geratobe3@gmail.com'
    },
    cc: 'geratobe3@gmail.com',
    headers: { Priority: 'Urgent', Importance: 'high' },
    templateId: 'd-d862a63b40924c7ca8180d6c94a9da8f',
    dynamicTemplateData: {
      subject: `Confirmation Change Password`
    }
  };

  return sgMail.send(emailClient);
};
