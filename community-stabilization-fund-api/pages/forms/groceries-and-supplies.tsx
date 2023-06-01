import Head from 'next/head';

import { GroceryAndSuppliesForm } from '../../src/modules/forms/components/grocery-and-supplies-form';

import type { NextPage } from 'next';
import BasicNavigation from '../../src/components/BasicNavigation';

const GroceriesAndSupplies: NextPage = () => (
  <div>
    <Head>
      <title>Community Stabalization Fund API | Groceries and Supplies</title>
      <meta name='description' content='Community Stabilization Funds API' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <BasicNavigation />
    <GroceryAndSuppliesForm />
  </div>
);

export default GroceriesAndSupplies;
