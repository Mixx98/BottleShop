'use strict';
import { Shipment } from '../../models/index.js';

const deleteShipment = async (req, res, next) => {
  try{
    const { id } = req.params;

    await Shipment.deleteOne({ _id: id });
    res.send("배송 정보가 삭제되었습니다.");
  } catch (err) {
    next(err);
  }
};

export default deleteShipment;