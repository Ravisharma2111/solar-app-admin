// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
  registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
  verify: path(ROOTS_AUTH, "/verify"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  newPassword: path(ROOTS_AUTH, "/new-password"),
};

export const PATH_PAGE = {
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  pricing: "/pricing",
  payment: "/payment",
  about: "/about-us",
  contact: "/contact-us",
  faqs: "/faqs",
  page403: "/403",
  page404: "/404",
  page500: "/500",
  components: "/components",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  sales_management: path(ROOTS_DASHBOARD, "/sales_management"),
  kanban: path(ROOTS_DASHBOARD, "/kanban"),
  calendar: path(ROOTS_DASHBOARD, "/calendar"),
  fileManager: path(ROOTS_DASHBOARD, "/files-manager"),
  permissionDenied: path(ROOTS_DASHBOARD, "/permission-denied"),
  blank: path(ROOTS_DASHBOARD, "/blank"),
  general: {
    app: path(ROOTS_DASHBOARD, "/app"),
  },
  customer: {
    root: path(ROOTS_DASHBOARD, "/customer"),
    profile: path(ROOTS_DASHBOARD, "/customer/profile"),
    customer_management: path(ROOTS_DASHBOARD, "/customer/customer_management"),
  },
  partner: {
    root: path(ROOTS_DASHBOARD, "/partner"),
    profile: path(ROOTS_DASHBOARD, "/partner/profile"),
    partner_management: path(ROOTS_DASHBOARD, "/partner/partner_management"),
  },
  company: {
    root: path(ROOTS_DASHBOARD, "/company"),
    profile: path(ROOTS_DASHBOARD, "/company/profile"),
    company_management: path(ROOTS_DASHBOARD, "/company/company_management"),
  },
  assign_your_call: {
    root: path(ROOTS_DASHBOARD, "/assign_your_call"),
    assign_your_calls: path(
      ROOTS_DASHBOARD,
      "/assign_your_call/assign_your_calls"
    ),
  },
  notification: {
    root: path(ROOTS_DASHBOARD, "/notification"),
    notifications: path(ROOTS_DASHBOARD, "/notification/notifications"),
  },
  solar: {
    root: path(ROOTS_DASHBOARD, "/solar"),
    profile: path(ROOTS_DASHBOARD, "/solar/profile"),
    solar_enquiry: path(ROOTS_DASHBOARD, "/solar/solar_enquiry"),
  },
  operation: {
    root: path(ROOTS_DASHBOARD, "/operation"),
    profile: path(ROOTS_DASHBOARD, "/operation/profile"),
    operation_maintain_ace_solar: path(
      ROOTS_DASHBOARD,
      "/operation/operation_maintain_ace_solar"
    ),
  },
  help_support: {
    root: path(ROOTS_DASHBOARD, "/help_and_support"),
    support: path(ROOTS_DASHBOARD, "/help_and_support/help_and_supports"),
  },
  flow_chart: {
    root: path(ROOTS_DASHBOARD, "/chart"),
    chart: path(ROOTS_DASHBOARD, "/chart"),
  },
  page_settings: {
    root: path(ROOTS_DASHBOARD, "/page_settings"),
    about_us: path(ROOTS_DASHBOARD, "/page_settings/about_us"),
    privacy_policy: path(ROOTS_DASHBOARD, "/page_settings/privacy_policy"),
    faq: path(ROOTS_DASHBOARD, "/page_settings/faq"),
    promo_code: path(ROOTS_DASHBOARD, "/page_settings/promo_code"),
    contact_us: path(ROOTS_DASHBOARD, "/page_settings/contact_us"),
    term_and_condition: path(
      ROOTS_DASHBOARD,
      "/page_settings/term_and_condition"
    ),
    video: path(ROOTS_DASHBOARD, "/page_settings/video"),
  },
};

export const PATH_DOCS = {
  root: "#",
  changelog: "#",
};

export const PATH_ZONE_ON_STORE = "#";

export const PATH_FREE_VERSION = "#";

export const PATH_FIGMA_PREVIEW = "#";
