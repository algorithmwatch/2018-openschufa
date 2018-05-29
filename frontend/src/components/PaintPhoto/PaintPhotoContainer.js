import PaintPhoto from './PaintPhoto';
import { connect } from 'react-redux';
import { setEditMode, addPolyline, undoPolyline } from '../../actions/photo';
import { MODE_ZOOM, MODE_PAINT } from '../../constants';

const mapStateToProps = state => {
  const { editMode, imageData, rotation, size, polylines } = state.photo;
  return {
    editMode,
    imageData,
    size,
    rotation,
    polylines,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setModeZoom: mode => dispatch(setEditMode(MODE_ZOOM)),
    setModePaint: mode => dispatch(setEditMode(MODE_PAINT)),
    addPolyline: polyline => dispatch(addPolyline(polyline)),
    undoPolyline: () => dispatch(undoPolyline()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaintPhoto);
