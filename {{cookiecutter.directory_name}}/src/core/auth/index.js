import { reducers } from './reducers';
import authRemotes from './remotes';

export {
  initialStates as authInitialStates,
  operations as authOperations,
  selectors as authSelectors,
  actionTypes as authActionTypes,
} from './reducers';
export { remotesBuilder as authRemotesBuilder } from './remotes';
export { authRemotes };

export default reducers;
