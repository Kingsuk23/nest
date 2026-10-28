import Panel from "./ui/Panel";

interface PropertyAboutProps {
  description: string;
}

const PropertyAbout: React.FC<PropertyAboutProps> = ({ description }) => {
  return (
    <Panel>
      <h2 className="text-2xl font-semibold">About</h2>
      <p className="text-base text-text-secondary">{description}</p>
    </Panel>
  );
};

export default PropertyAbout;
