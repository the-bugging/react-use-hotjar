import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  makeStyles,
  Link,
} from '@material-ui/core';
import useHotjar from 'react-use-hotjar';

const useStyles = makeStyles({
  root: {
    maxWidth: 390,
    margin: '4rem auto',
  },
  list: {
    padding: '0 1.5rem',
  },
});

const myCustomLogger = console.info;

function RenderLoggedArea() {
  const classes = useStyles();
  const [loginInfo, setLoginInfo] = useState(null);
  const { identifyHotjar } = useHotjar();

  useEffect(() => {
    setLoginInfo(() => ({
      name: 'Olli',
      surname: 'Parno',
      identification: 1234567,
      address: 'Streets of Tomorrow',
    }));
  }, []);

  useEffect(() => {
    if (loginInfo) {
      const { identification, ...restOfInformation } = loginInfo;
      identifyHotjar(
        loginInfo.identification,
        JSON.stringify(restOfInformation),
        myCustomLogger
      );
    }
  }, [identifyHotjar, loginInfo]);

  return (
    loginInfo && (
      <>
        <ul className={classes.list}>
          <li>
            <Typography variant="body2" color="textSecondary" component="p">
              Name: <b>{loginInfo.name}</b>
            </Typography>
          </li>
          <li>
            <Typography variant="body2" color="textSecondary" component="p">
              Surname: <b>{loginInfo.surname}</b>
            </Typography>
          </li>
          <li>
            <Typography variant="body2" color="textSecondary" component="p">
              Identification: <b>{loginInfo.identification}</b>
            </Typography>
          </li>
          <li>
            <Typography variant="body2" color="textSecondary" component="p">
              Address: <b>{loginInfo.address}</b>
            </Typography>
          </li>
        </ul>
      </>
    )
  );
}

export default function App() {
  const classes = useStyles();
  const { initHotjar } = useHotjar();
  const [showLogin, setShowLogin] = useState(false);
  const [isHotjarReady, setHotjarReady] = useState(false);

  useEffect(() => {
    const isReady = initHotjar(2262285, 6, false, myCustomLogger);

    setHotjarReady(isReady);
  }, [initHotjar]);

  function handleShowLogin() {
    setShowLogin(!showLogin);
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h1">
          react-use-hotjar
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="h2"
          paragraph
        >
          Adds Hotjar capabilities as custom hooks such as initializing Hotjar
          with its proper application ID and Version and identifying users
          through{' '}
          <Link
            target="_blank"
            href="https://help.hotjar.com/hc/en-us/articles/360033640653-Identify-API-Reference"
          >
            Hotjar&apos;s Identify API.
          </Link>
        </Typography>
      </CardContent>
      {showLogin && (
        <CardContent>
          <RenderLoggedArea />
        </CardContent>
      )}
      <CardActions>
        <Button
          disabled={!isHotjarReady}
          size="small"
          color="primary"
          onClick={handleShowLogin}
        >
          {showLogin ? 'Click to logout!' : 'Click to login!'}
        </Button>
      </CardActions>
    </Card>
  );
}
