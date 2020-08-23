import { simpleMutationDispatchWithPreprocessor } from '../../utils/simpleMutationDispatch';

export default Object.freeze({
  updateTrackingId: trackingId => simpleMutationDispatchWithPreprocessor(() => {
      if (typeof trackingId !== 'string') {
        throw new Error('Tracking ID must be a string');
      }
    }, { trackingId }),
});
