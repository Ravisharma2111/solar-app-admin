// routes
import { PATH_DASHBOARD } from "@/routes/paths";
// components
import Label from "@/components/label";
import Iconify from "@/components/iconify";
import SvgColor from "@/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  blog: icon("ic_blog"),
  cart: icon("ic_cart"),
  chat: icon("ic_chat"),
  mail: icon("ic_mail"),
  user: icon("ic_user"),
  file: icon("ic_file"),
  lock: icon("ic_lock"),
  label: icon("ic_label"),
  blank: icon("ic_blank"),
  kanban: icon("ic_kanban"),
  folder: icon("ic_folder"),
  banking: icon("ic_banking"),
  booking: icon("ic_booking"),
  invoice: icon("ic_invoice"),
  calendar: icon("ic_calendar"),
  disabled: icon("ic_disabled"),
  external: icon("ic_external"),
  menuItem: icon("ic_menu_item"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
  notification: "iconamoon:notification-light",
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    // subheader: "Dashboard",
    items: [
      {
        title: "Dashboard",
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
      },
      {
        title: "Customers",
        path: PATH_DASHBOARD.customer.customer_management,
        icon: <Iconify icon="ph:users-three" />,
      },
      {
        title: "Solar Enquiries",
        path: PATH_DASHBOARD.solar.solar_enquiry,
        icon: <Iconify icon="material-symbols:solar-power" />,
      },
      {
        title: "Maintenance Enquiries",
        path: PATH_DASHBOARD.operation.operation_maintain_ace_solar,
        icon: <Iconify icon="wpf:maintenance" />,
      },
      {
        title: "Solar Companies",
        path: PATH_DASHBOARD.company.company_management,
        icon: <Iconify icon="mdi:company" />,
      },
      {
        title: "Assign Your Call",
        path: PATH_DASHBOARD.assign_your_call.assign_your_calls,
        icon: <Iconify icon="clarity:assign-user-solid" />,
      },
      {
        title: "Notifications",
        path: PATH_DASHBOARD.notification.notifications,
        icon: <Iconify icon={ICONS.notification} />,
      },
      {
        title: "Partner",
        path: PATH_DASHBOARD.partner.partner_management,
        icon: <Iconify icon="material-symbols:group" />,
      },
      {
        title: "Page Settings",
        path: PATH_DASHBOARD.page_settings.root,
        icon: <Iconify icon="material-symbols:settings-outline" />,
        children: [
          {
            title: "Video",
            path: PATH_DASHBOARD.page_settings.video,
          },
          {
            title: "About us",
            path: PATH_DASHBOARD.page_settings.about_us,
          },
          {
            title: "Promo Code",
            path: PATH_DASHBOARD.page_settings.promo_code,
          },
          {
            title: "Privacy policy",
            path: PATH_DASHBOARD.page_settings.privacy_policy,
          },
          {
            title: "FAQ",
            path: PATH_DASHBOARD.page_settings.faq,
          },
          {
            title: "Contact Us",
            path: PATH_DASHBOARD.page_settings.contact_us,
          },
          {
            title: "Terms & Conditions",
            path: PATH_DASHBOARD.page_settings.term_and_condition,
          },
        ],
      },
    ],
  },
];

export default navConfig;
