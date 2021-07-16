import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import RoadMapCard from './RoadMapCard';
import roadmapContent from './roadmapContent';

const DesktopRoadMap: React.FC = () => {
  return (
    <Box marginY={5} position='relative'>
      <Box display='flex' flexDirection='row'>
        <Box
          height='100%'
          border='solid 1px #E5E5E5'
          position='absolute'
          zIndex='-1'
        />
        <Box marginLeft='-10px' paddingTop={4}>
          {roadmapContent.map((value) => (
            <Box marginBottom={10.5}>
              <RoadMapCard {...value} showDot />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DesktopRoadMap;
