import { RECIPIENT_INFORMATION_FIELDS } from "../constants";
import { BagItemsMap } from "../types";
import { formResponseMock } from "../../../mocks";
import { mapFormResponseToBagItems, mapFormResponseToRecipientInfo } from "../utils";
import { omit } from "../../../utils";

import { ItemChecklistTableColumn } from "./ItemChecklistTableColumn";

import styles from '../styles/checklists.module.css';

const recipientInfoMock = mapFormResponseToRecipientInfo(formResponseMock);
const bagItemsMock = mapFormResponseToBagItems(formResponseMock);

interface ItemChecklistByRecipientProps {
    bagItemsMap?: BagItemsMap;
    recipientInfo?: (string | number)[];
}

const ItemChecklistByRecipient = ({
  bagItemsMap = bagItemsMock,
  recipientInfo = recipientInfoMock
}: ItemChecklistByRecipientProps) => {

  const conditionalPunctuation = (text: string) => text === "COVID concern" ? "?" : ":";
  const getRecipientInfo = (text: string, id: number) => `${text}${conditionalPunctuation(text)} ${recipientInfo[id]}`;

  const recipientInfoList = RECIPIENT_INFORMATION_FIELDS.map((field, id) =>
    <p key={field+id} className={styles.user_info__p}>{getRecipientInfo(field, id)}</p>);

  // Only display Feminine Hygiene items if the recipient has them, otherwise guard against the field being passed
  const bagItemsObj: BagItemsMap = formResponseMock.feminine_health_care_id
    ? bagItemsMap
    : omit("Feminine Hygiene", bagItemsMap);

  console.log("Object.keys: ", Object.keys(bagItemsObj))
  return (
    <div id="item-checklist-table" className={styles.item_checklist_wrapper}>
      <>
        <div className={styles.user_info}>
          {recipientInfoList}
        </div>

        <div className={styles.item_checklist_row}>
          {Object.keys(bagItemsObj).map((key, id) => {
            const thead = key;
            const bagItems = bagItemsObj[key].map(item => `${item.name} (x${item.quantity})`);
            return (
              <ItemChecklistTableColumn thead={thead} key={key} items={bagItems} isFirstIndex={id === 0}/>
            );
          })}
        </div>
      </>
    </div>
  );
};

export { ItemChecklistByRecipient };