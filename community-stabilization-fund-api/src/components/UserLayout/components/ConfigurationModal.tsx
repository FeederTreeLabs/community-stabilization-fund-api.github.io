import { Modal } from "carbon-components-react";
import { BasicSelect } from "../../BasicSelect";
import { useForm } from "react-hook-form";
import { ChecklistRule } from "../../../modules";
import { useEffect } from "react";

interface ConfigurationModalProps {
  packageGroups: string[];
  packageItems: string[];
  openConfiguration: boolean;
  onRequestClose: () => void;
  onRequestSubmit: (data?: ChecklistRule) => void;
  onPackageChange: (data?: ChecklistRule["packageGroup"]) => void;
}

const ConfigurationModal = ({ 
  packageGroups, 
  packageItems, 
  openConfiguration, 
  onRequestClose, 
  onRequestSubmit,
  onPackageChange,
}: ConfigurationModalProps) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChecklistRule>();

  useEffect(() => {
    const packageGroup = watch('packageGroup');
    if(packageGroup) onPackageChange(packageGroup);
  }, [watch('packageGroup')]);

  return (
    <Modal
      open={openConfiguration}
      modalHeading='Configure Checklists'
      modalLabel='Admin functions'
      primaryButtonText='Submit'
      secondaryButtonText='Cancel'
      size={'md'}
      onRequestClose={onRequestClose}
      onRequestSubmit={handleSubmit(onRequestSubmit)}
    >
      <h5>Configure Package Rules</h5>
      <p>
        In the package group
        <BasicSelect 
          id='package-dropdown'
          items={packageGroups}
          noLabel
          defaultText='Choose a package'
          {...register('packageGroup', { required: true })}
          invalid={!!errors.packageGroup}
        />
        there should be 
        <BasicSelect 
          id='quantity-dropdown'
          items={["1","2","3","4","5"]}
          noLabel
          defaultText='Choose an item quantity'
          {...register('itemQuantity', { required: true })}
          invalid={!!errors.itemQuantity}
        />
        per
        <BasicSelect 
          id='item-dropdown'
          items={packageItems} 
          noLabel
          defaultText='Choose an item'
          {...register('packageItem', { required: true })}
          invalid={!!errors.packageItem}
        />
        for
        <BasicSelect
          id='household-members-dropdown'
          items={["1","2","3","4","5","6","7","8","9","10"]}
          noLabel
          defaultText='Choose # of household members'
          {...register('householdMembers', { required: true })}
          invalid={!!errors.householdMembers}
        />
        household members.
      </p>
    </Modal>
  )
}

export { ConfigurationModal };