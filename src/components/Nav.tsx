import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

interface Props {
  libraryStatus: boolean;
  setLibraryStatus(status: boolean): void;
}

export const Nav = ({ libraryStatus, setLibraryStatus }: Props) => (
  <nav>
    <h1>Waves</h1>
    <button onClick={() => setLibraryStatus(!libraryStatus)}>
      Library <FontAwesomeIcon icon={faMusic} />
    </button>
  </nav>
);
