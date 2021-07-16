import { Box } from '@material-ui/core';
import RoadMapCard from './RoadMapCard';
import roadmapContent from './roadmapContent';

const MobileRoadMap: React.FC = () => {
  return (
    <Box marginY={5} position='relative'>
      {roadmapContent.map((value) => (
        <Box marginBottom={4}>
          <RoadMapCard {...value} />
        </Box>
      ))}
    </Box>
  );
};

export default MobileRoadMap;
