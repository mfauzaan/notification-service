export const NotificationTypesSeeds = [
  {
    name: 'monthly-payslip',
    templates: [
      {
        title: 'Pay slip for {{month}} {{year}}',
        content: 'Hi {{fullName}}, Your salary has been processed',
        channel: 'email',
      },
    ],
  },
  {
    name: 'leaves-reminder',
    templates: [
      {
        content:
          'Hi {{firstName}}, Reminder to book your leaves before it expires.',
        channel: 'UI',
      },
    ],
  },
  {
    name: 'happy-birthday',
    templates: [
      {
        content: 'Happy Birthday {{firstName}}.',
        channel: 'UI',
      },
      {
        title: '{{companyName}} is wishing you a happy birthday',
        content: 'Happy Birthday {{firstName}}.',
        channel: 'email',
      },
    ],
  },
];
