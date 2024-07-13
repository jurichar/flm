import { Card } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import modulePreviews from '../../../utils/modulePreviews';

const ModuleCard = ({ moduleName, hasAccess }) => {
  const navigate = useNavigate();

  const handleCardClick = (event) => {
    if (event.target.tagName !== 'INPUT') {
      navigate(`/module/${moduleName}`);
    }
  };

  const PreviewComponent = modulePreviews[moduleName];

  return (
    <Card className="w-auto p-4 h-80 text-xl" onClick={handleCardClick}>
      <h3>{moduleName}</h3>
      {hasAccess(moduleName) ? (
        PreviewComponent ? (
          <PreviewComponent />
        ) : (
          <p>Component not found</p>
        )
      ) : (
        <p>Module preview unavailable</p>
      )}
    </Card>
  );
};

export default ModuleCard;
