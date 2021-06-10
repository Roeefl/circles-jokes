import PropTypes from 'prop-types';

export const JokePropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  setup: PropTypes.string,
  punchline: PropTypes.string,
});
