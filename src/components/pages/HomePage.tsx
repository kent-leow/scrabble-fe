import {
  FC,
  FormEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import GlobalContext from '~/core/contexts/GlobalContext';
import { useRouter } from 'next/navigation';
import { ROUTES } from '~/utils/constants/routes';
import { createScore } from '~/core/apis/scores.api';
import { displayErrorToast, displaySuccessToast } from '~/utils/helpers/toast';
import CenteredCard from '~/components/templates/CenteredCard';

const HomePage: FC = () => {
  const { push } = useRouter();
  const tileNumber = 10;
  const { scoreRules } = useContext(GlobalContext);
  const [strings, setStrings] = useState<string[]>(
    new Array(tileNumber).fill(''),
  );
  const [score, setScore] = useState<number>(0);
  const stringTileRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    stringTileRef.current[0].focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^[a-zA-Z]*$/.test(value)) {
      return;
    }
    let newArr = [...strings];
    newArr[index] = value.toUpperCase();
    setStrings(newArr);

    if (value && index < tileNumber - 1) {
      stringTileRef.current[index + 1].focus();
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (/^[a-zA-Z]$/.test(e.key) && !!stringTileRef.current[index].value) {
      stringTileRef.current[index].value = e.key.toUpperCase();
      handleChange(e.key, index);
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      stringTileRef.current[index - 1].focus();
    }
    if (e.key === 'ArrowRight' && index < tileNumber - 1) {
      stringTileRef.current[index + 1].focus();
    }
    if (e.key === 'Backspace' && index > 0) {
      stringTileRef.current[index - 1].focus();
    }
  };

  const handleResetTiles = () => {
    setStrings(new Array(tileNumber).fill(''));
    stringTileRef.current[0].focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      await createScore({ string: strings.join(''), score });
      handleResetTiles();
      displaySuccessToast('Score saved');
    } catch (e: unknown) {
      displayErrorToast(e);
    }
  };

  useEffect(() => {
    setScore(
      strings.reduce(
        (acc, curr) => acc + (scoreRules[curr.toUpperCase()] ?? 0),
        0,
      ),
    );
  }, [scoreRules, strings]);

  return (
    <CenteredCard>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Stack direction="row" spacing={2}>
            {strings.map((value, index) => (
              <TextField
                size="small"
                key={index}
                inputRef={(ref) => (stringTileRef.current[index] = ref)}
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyUp={(e) => handleKeyUp(e, index)}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: 'center' },
                }}
                sx={{ width: 48 }}
              />
            ))}
          </Stack>
          <Typography variant="body1">Score: {score ?? 0}</Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleResetTiles}
            >
              Reset Tiles
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Score
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => push(ROUTES.HIGH_SCORES)}
            >
              View Top Scores
            </Button>
          </Stack>
        </Stack>
      </form>
    </CenteredCard>
  );
};

export default HomePage;
