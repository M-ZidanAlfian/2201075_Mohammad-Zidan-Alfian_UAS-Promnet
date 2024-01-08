import React, { Component } from "react";
import UserService from "../services/UserService";

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {},
    };
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      this.setState({ user: res.data });
    });
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">Peminjaman Buku</h3>
          <div className="card-body">
            <div className="row">
              <label> Judul Buku   : </label>
              <div> {this.state.user.judul_buku}</div>
            </div>
            <div className="row">
              <label> Jumlah   : </label>
              <div> {this.state.user.jumlah}</div>
            </div>
            <div className="row">
              <label> Alamat  : </label>
              <div> {this.state.user.alamat_peminjam}</div>
            </div>
            <div className="row">
              <label> No Hp : </label>
              <div> {this.state.user.nohp_peminjam}</div>
            </div>
            <div className="row">
              <label> Tanggal Pinjam  : </label>
              <div> {this.state.user.tanggal_pinjam}</div>
            </div>
            <div className="row">
              <label> Tanggal Pengembalian: </label>
              <div> {this.state.user.tanggal_pengembalian}</div>
            </div>
            <div className="row">
              <label> Lama Pinjam: </label>
              <div> {this.state.user.lama_pinjam}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewUserComponent;
