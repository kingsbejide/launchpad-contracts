import { Box, Typography, useTheme } from '@material-ui/core';
import React from 'react';

type RoadMapContentType = {
  title: string;
  description: string;
};
export type RoadMapCardType = {
  date: string;
  content: RoadMapContentType[];
  showDot?: boolean;
};

const RoadMapCard: React.FC<RoadMapCardType> = ({
  date,
  content,
  showDot = false,
}) => {
  const theme = useTheme();
  return (
    <Box display='flex' flexDirection='row'>
      {showDot && (
        <Box marginRight={3}>
          <Box
            borderRadius='50%'
            border={`solid 7px ${theme.palette.info.main}`}
            width='22px'
            height='22px'
            style={{ background: 'white' }}
          ></Box>
        </Box>
      )}
      <Box
        borderRadius='12px'
        boxShadow='0px 0px 30px rgba(0, 0, 0, 0.08)'
        borderLeft={`solid 4px ${theme.palette.info.main}`}
        paddingY={3}
        paddingX={4.5}
      >
        <Typography variant='h3'>{date}</Typography>
        {content.map((value) => (
          <>
            <Box mt={4} />
            <Typography
              variant='subtitle2'
              style={{ color: theme.palette.info.main }}
            >
              {value.title}
            </Typography>
            <Box mt={2} />
            <Typography variant='body1'>{value.description}</Typography>
          </>
        ))}
      </Box>
    </Box>
  );
};

export default RoadMapCard;
