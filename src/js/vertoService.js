// private stuff
const _verto = new WeakMap();
const _data = new WeakMap();

//class
class VertoService {
  constructor(data){
    _data.set(this, data);
  }

}

//static functions
VertoService.getInstance = () => {
  if (!_verto.get(window)) {
    _verto.set(window, new VertoService({}));
  }

  return  _verto.get(window);
}

//exporting
export default VertoService;
