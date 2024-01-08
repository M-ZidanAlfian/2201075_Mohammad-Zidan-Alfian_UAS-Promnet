import React, { Component } from "react";
import Swal from 'sweetalert2';
import UserService from "../services/UserService";

class CreateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      judul_buku: "",
      jumlah: "",
      nama_peminjam: "",
      alamat_peminjam: "",
      nohp_peminjam: "",
      tanggal_pinjam: "",
      tanggal_pengembalian: "",
      lama_pinjam: "",
    };

    this.changeJudulBuku = this.changeJudulBuku.bind(this);
    this.changeJumlah = this.changeJumlah.bind(this);
    this.changeNamaPeminjam = this.changeNamaPeminjam.bind(this);
    this.changeAlamatPeminjam = this.changeAlamatPeminjam.bind(this);
    this.changeNohpPeminjam = this.changeNohpPeminjam.bind(this);
    this.changeTanggalPinjam = this.changeTanggalPinjam.bind(this);
    this.changeTanggalPengembalian = this.changeTanggalPengembalian.bind(this);
    this.changeLamaPinjam = this.changeLamaPinjam.bind(this);
    this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
  }

  componentDidMount() {
    if (this.state.id !== "_add") {
      UserService.getUserById(this.state.id).then((res) => {
        let user = res.data;
        this.setState({
          judul_buku: user.judul_buku,
          jumlah: user.jumlah,
          nama_peminjam: user.nama_peminjam,
          alamat_peminjam: user.alamat_peminjam,
          nohp_peminjam: user.nohp_peminjam,
          tanggal_pinjam: user.tanggal_pinjam,
          tanggal_pengembalian: user.tanggal_pengembalian,
          lama_pinjam: user.lama_pinjam,
        });
      });
    }
  }

  saveOrUpdateUser = (e) => {
    e.preventDefault();
    let user = {
      judul_buku: this.state.judul_buku,
      jumlah: String(this.state.jumlah),
      nama_peminjam: this.state.nama_peminjam,
      alamat_peminjam: this.state.alamat_peminjam,
      nohp_peminjam: this.state.nohp_peminjam,
      tanggal_pinjam: this.state.tanggal_pinjam,
      tanggal_pengembalian: this.state.tanggal_pengembalian,
      lama_pinjam: this.state.lama_pinjam,
    };

    console.log("user");

    if (this.state.id === "_add") {
      UserService.createUser(user).then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Data berhasil ditambahkan",
          showConfirmButton: false,
          timer: 1500
        });
        this.props.history.push("/users");
      });
    } else {
      UserService.updateUser(user, this.state.id).then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "data berhasil di update",
          showConfirmButton: false,
          timer: 1500
        });
        this.props.history.push("/users");
      });
    }
  };

  changeJudulBuku = (event) => {
    this.setState({ judul_buku: event.target.value });
  };

  changeJumlah = (event) => {
    this.setState({ jumlah: event.target.value });
  };

  changeNamaPeminjam = (event) => {
    this.setState({ nama_peminjam: event.target.value });
  };

  changeAlamatPeminjam = (event) => {
    this.setState({ alamat_peminjam: event.target.value });
  };

  changeNohpPeminjam = (event) => {
    console.log(event.target.value);
    this.setState({ nohp_peminjam: event.target.value });
  };

  changeTanggalPinjam = (event) => {
    console.log(event.target.value);
    this.setState({ tanggal_pinjam: event.target.value });
  };

  changeTanggalPengembalian = (event) => {
    console.log(event.target.value);
    this.setState({ tanggal_pengembalian: event.target.value });
  };

  changeLamaPinjam = (event) => {
    console.log(event.target.value);
    this.setState({ lama_pinjam: event.target.value });
  };

  cancel = () => {
    this.props.history.push("/users");
  };

  getTitle = () => {
    return this.state.id === "_add" ? (
      <h3 className="text-center">Data Peminjaman Buku</h3>
    ) : (
      <h3 className="text-center">Update User</h3>
    );
  };

  render() {
    return (
      <div>
        <br />
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Judul Buku </label>
                    <input
                      name="judul_buku"
                      className="form-control"
                      value={this.state.judul_buku}
                      onChange={this.changeJudulBuku}
                    />
                  </div>
                  <div className="form-group">
                    <label> Jumlah</label>
                    <div className="input-group">
                      <input
                        type="number"
                        name="jumlah"
                        className="form-control"
                        value={this.state.jumlah}
                        onChange={this.changeJumlah}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label> Nama Peminjam </label>
                    <input
                      name="nama_peminjam"
                      className="form-control"
                      value={this.state.nama_peminjam}
                      onChange={this.changeNamaPeminjam}
                    />
                  </div>
                  <div className="form-group">
                    <label> Alamat Peminjam </label>
                    <input
                      name="alamat_peminjam"
                      className="form-control"
                      value={this.state.alamat_peminjam}
                      onChange={this.changeAlamatPeminjam}
                    />
                  </div>
                  <div className="form-group">
                    <label> No Hp Peminjam </label>
                    <input
                      name="nohp_peminjam"
                      className="form-control"
                      value={this.state.nohp_peminjam}
                      onChange={this.changeNohpPeminjam}
                    />
                  </div>
                  <div className="form-group">
                    <label> Tanggal Pinjam </label>
                    <input
                      type="date"
                      name="tanggal_pinjam"
                      className="form-control"
                      value={this.state.tanggal_pinjam}
                      onChange={this.changeTanggalPinjam}
                    />
                  </div>
                  <div className="form-group">
                    <label> Tanggal Pengembalian </label>
                    <input
                      type="date"
                      name="tanggal_pengembalian"
                      className="form-control"
                      value={this.state.tanggal_pengembalian}
                      onChange={this.changeTanggalPengembalian}
                    />
                  </div>
                  <div className="form-group">
                    <label> Lama Pinjam </label>
                    <input
                      name="lama_pinjam"
                      className="form-control"
                      value={this.state.lama_pinjam}
                      onChange={this.changeLamaPinjam}
                    />
                    <br></br>
                    <div>
                      <button
                        className="btn btn-success"
                        onClick={this.saveOrUpdateUser}
                      >
                        Simpan
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={this.cancel}
                        style={{ marginLeft: "10px" }}
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUserComponent;
