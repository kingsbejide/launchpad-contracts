import {
  Box,
  Container,
  makeStyles,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

const useStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
  },
}));

type PolicyPageProps = {
  markdown: string;
  next?: any; 
  previous?: any;
};

const CookiePolicy: React.FC<PolicyPageProps> = ({ markdown, next, previous }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box className={classes.contentContainer} paddingY={8}>
      <Container maxWidth='md'>
        <ReactMarkdown
          remarkPlugins={[gfm]}
          children={markdown} 
          components={{
            blockquote: ({node, ...props}) => <div style={{padding: 8,
              margin: 0,
              backgroundColor: "#F2F4F5"}} {...props} />,
            h1: ({node, ...props}) => <Typography variant='h2' style={{
              marginBottom: 48,
            }}{...props} />,
            h2: ({node, ...props}) => <Typography variant='h3' style={{
              color: "#0AC6E5",
              marginTop: 48,
              marginBottom: 24,
            }} {...props} />,
            h3: ({node, ...props}) => <Typography variant='h5' style={{
              marginTop: 48,
              marginBottom: 24,
            }} {...props} />,
            a: ({node, ...props}) => <a style={{
              color: "#0AC6E5",
              }} {...props} />
          }}
        />
      </Container>
    </Box>
  );
};

export default CookiePolicy;
