type PropertyDetailItemProps = {
  label: string;
  value: string | number;
};

const PropertyDetailItem = ({ label, value }: PropertyDetailItemProps) => {
  return (
    <div className="flex w-full flex-col sm:w-42">
      <p className="text-base text-text-secondary text-nowrap">{label}</p>
      <p className="mt-1 text-base text-nowrap">{value}</p>
      <hr className="mt-3 w-full border-border-mute" />
    </div>
  );
};

export default PropertyDetailItem;
