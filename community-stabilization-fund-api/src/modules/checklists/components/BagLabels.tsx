import { RECIPIENT_INFORMATION_FIELDS } from '../constants';
import { createBagItems } from '../utils';

import { BagList, DymoBagOpOneList } from './BagList';

import type { BagItemsMap } from '../types';

import styles from '../styles/checklists.module.css';

interface BagLabelsProps {
  //TODO: Why would this have instances of undefined?
  recipientInfo: (string | number | undefined)[];
  bagItemsMap: BagItemsMap;
  packages?: string[];
  labelCount: number;
}

const DymoBagLabelsOpOne = ({
  recipientInfo,
  bagItemsMap,
  labelCount,
  packages,
}: BagLabelsProps) => {
  const groceryTHead = 'Groceries Bag';
  const groceryItems = createBagItems('Groceries', bagItemsMap);

  const getRecipientInfo = (text: string, id: number) => (
    <>
      <strong>{text}:</strong> {recipientInfo[id]}
    </>
  );

  const recipientInfoList = RECIPIENT_INFORMATION_FIELDS.slice(0, 4).map(
    (field, id) => (
      <p className={styles.dymo_recipient_info} key={field + id}>
        {getRecipientInfo(field, id)}
      </p>
    )
  );
  const grocerySlicePos = [
    [0, 1],
    [1, 4],
    [4, 6],
    [6, groceryItems.length],
  ];

  const groceryItemLabels =
    packages?.includes('Food') &&
    DymoBagOpOneList(
      grocerySlicePos,
      recipientInfoList,
      groceryTHead,
      groceryItems,
      labelCount
    );

  const generalHygieneTHead = 'General Hygiene Bag';
  const generalHygieneItems = createBagItems('General Hygiene', bagItemsMap);
  const generalHygieneSlicePos = [[0, generalHygieneItems.length]];
  const generalHygieneLabels =
    packages?.includes('General Hygiene') &&
    DymoBagOpOneList(
      generalHygieneSlicePos,
      recipientInfoList,
      generalHygieneTHead,
      generalHygieneItems,
      labelCount
    );

  const cleaningHealthSupplyTHead = 'Cleaning/Health Supplies Bag';
  const cleaningHealthSupplyItems = createBagItems(
    'Cleaning/Health Supplies',
    bagItemsMap
  );
  const cleaningHealthSlicePos = [
    [0, 4],
    [4, cleaningHealthSupplyItems.length],
  ];
  const cleaningHealthSupplyLabels =
    packages?.includes('Cleaning/Health Supplies') &&
    DymoBagOpOneList(
      cleaningHealthSlicePos,
      recipientInfoList,
      cleaningHealthSupplyTHead,
      cleaningHealthSupplyItems,
      labelCount
    );

  const feminineHygieneTHead = 'Feminine Hygiene Bag';
  const feminineHygieneItems = createBagItems('Feminine Hygiene', bagItemsMap);
  const feminineHygieneSlicePos = [[0, feminineHygieneItems.length]];
  const femineHygieneLabels =
    packages?.includes('Feminine Health Care') &&
    DymoBagOpOneList(
      feminineHygieneSlicePos,
      recipientInfoList,
      feminineHygieneTHead,
      feminineHygieneItems,
      labelCount
    );
  return (
    <div>
      <div>{groceryItemLabels}</div>
      <div>{generalHygieneLabels}</div>
      <div>{cleaningHealthSupplyLabels}</div>
      <div>{femineHygieneLabels}</div>
    </div>
  );
};

const BagLabels = ({
  recipientInfo,
  bagItemsMap,
  labelCount,
  packages,
}: BagLabelsProps) => {
  const groceryTHead = 'Groceries Bag';
  const groceryItems = createBagItems('Groceries', bagItemsMap);

  const getRecipientInfo = (text: string, id: number) => (
    <>
      <strong>{text}:</strong> {recipientInfo[id]}
    </>
  );

  const recipientInfoList = RECIPIENT_INFORMATION_FIELDS.slice(0, 3).map(
    (field, id) => (
      <p key={field + id} className={styles.user_bag_label_info__p}>
        {getRecipientInfo(field, id)}
      </p>
    )
  );
  const grocerySlicePos = [
    [0, 1],
    [1, 4],
    [4, 6],
    [6, groceryItems.length],
  ];

  const groceryItemLabels =
    packages?.includes('Food') &&
    BagList(
      grocerySlicePos,
      recipientInfoList,
      groceryTHead,
      groceryItems,
      labelCount
    );

  labelCount = 0;
  const generalHygieneTHead = 'General Hygiene Bag';
  const generalHygieneItems = createBagItems('General Hygiene', bagItemsMap);
  const generalHygieneSlicePos = [[0, generalHygieneItems.length]];
  const generalHygieneLabels =
    packages?.includes('General Hygiene') &&
    BagList(
      generalHygieneSlicePos,
      recipientInfoList,
      generalHygieneTHead,
      generalHygieneItems,
      labelCount
    );

  labelCount = 0;
  const cleaningHealthSupplyTHead = 'Cleaning/Health Supplies Bag';
  const cleaningHealthSupplyItems = createBagItems(
    'Cleaning/Health Supplies',
    bagItemsMap
  );
  const cleaningHealthSlicePos = [
    [0, 4],
    [4, cleaningHealthSupplyItems.length],
  ];
  const cleaningHealthSupplyLabels =
    packages?.includes('Cleaning/Health Supplies') &&
    BagList(
      cleaningHealthSlicePos,
      recipientInfoList,
      cleaningHealthSupplyTHead,
      cleaningHealthSupplyItems,
      labelCount
    );

  labelCount = 0;
  const feminineHygieneTHead = 'Feminine Hygiene Bag';
  const feminineHygieneItems = createBagItems('Feminine Hygiene', bagItemsMap);
  const feminineHygieneSlicePos = [[0, feminineHygieneItems.length]];
  const femineHygieneLabels =
    packages?.includes('Feminine Health Care') &&
    BagList(
      feminineHygieneSlicePos,
      recipientInfoList,
      feminineHygieneTHead,
      feminineHygieneItems,
      labelCount
    );

  return (
    <div className={styles.bag_labels_wrapper}>
      <div className={styles.bag_labels}>{groceryItemLabels}</div>
      <div className={styles.bag_labels}>
        {generalHygieneLabels}
        {cleaningHealthSupplyLabels}
        {femineHygieneLabels}
      </div>
    </div>
  );
};

export { BagLabels, DymoBagLabelsOpOne };
