import {
  dummyPaymentHandler,
  DefaultJobQueuePlugin,
  DefaultSchedulerPlugin,
  DefaultSearchPlugin,
  VendureConfig,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin, FileBasedTemplateLoader } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { GraphiqlPlugin } from '@vendure/graphiql-plugin';
import { StripePlugin } from '@vendure/payments-plugin/package/stripe';
import 'dotenv/config';
import path from 'path';

const IS_DEV = process.env.APP_ENV === 'dev';
const serverPort = +process.env.PORT || 3000;

export const config: VendureConfig = {
  apiOptions: {
    port: serverPort,
    adminApiPath: 'admin-api',
    shopApiPath: 'shop-api',
    ...(IS_DEV
      ? {
          adminApiDebug: true,
          shopApiDebug: true,
        }
      : {}),
  },
  authOptions: {
    tokenMethod: ['bearer', 'cookie'],
    superadminCredentials: {
      identifier: process.env.SUPERADMIN_USERNAME!,
      password: process.env.SUPERADMIN_PASSWORD!,
    },
    cookieOptions: {
      secret: process.env.COOKIE_SECRET!,
    },
  },
  dbConnectionOptions: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    migrations: [path.join(__dirname, './migrations/*.+(js|ts)')],
    logging: false,
  },
  paymentOptions: {
    paymentMethodHandlers: [
      dummyPaymentHandler,
    ],
  },
  customFields: {},
  plugins: [
    GraphiqlPlugin.init(),
    AssetServerPlugin.init({
      route: 'assets',
      assetUploadDir: path.join(__dirname, '../static/assets'),
      assetUrlPrefix: IS_DEV ? undefined : process.env.ASSET_URL,
    }),
    DefaultSchedulerPlugin.init(),
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    DefaultSearchPlugin.init({ bufferUpdates: true, indexStockStatus: true }),
    EmailPlugin.init({
      devMode: true,
      outputPath: path.join(__dirname, '../static/email/test-emails'),
      route: 'mailbox',
      handlers: defaultEmailHandlers,
      templateLoader: new FileBasedTemplateLoader(
        path.join(__dirname, '../static/email/templates'),
      ),
      globalTemplateVars: {
        fromAddress: '"example" <noreply@example.com>',
        verifyEmailAddressUrl: 'http://localhost:8080/verify',
        passwordResetUrl: 'http://localhost:8080/password-reset',
        changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change',
      },
    }),
    AdminUiPlugin.init({
      route: 'admin',
      port: serverPort,
      adminUiConfig: {
        apiPort: serverPort,
      },
    }),
    StripePlugin.init({
      storeCustomersInStripe: true,
    }),
  ],
};