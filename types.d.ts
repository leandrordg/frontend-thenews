type WebhookDataResponse = {
  data: {
    id: string;
    email: string;
    status: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmChannel?: string;
    referringSite?: string;
    createdAt: string;
  };
};
