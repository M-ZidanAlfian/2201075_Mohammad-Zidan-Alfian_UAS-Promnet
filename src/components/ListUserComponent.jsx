import React, { Component } from "react";
import Swal from 'sweetalert2';
import UserService from "../services/UserService";

class ListUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser(id) {
    UserService.deleteUser(id).then((res) => {
      Swal.fire({
        title: "Apakah kamu yakin?",
        text: "Kamu akan menghapus data ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Terhapus!",
            text: "Datamu sudah terhapus.",
            icon: "success"
          });
        }
      });
      this.setState({
        users: this.state.users.filter((user) => user.id !== id),
      });
    });
  }
  viewUser(id) {
    this.props.history.push(`/view-user/${id}`);
  }
  editUser(id) {
    this.props.history.push(`/add-user/${id}`);
  }

  componentDidMount() {
    UserService.getUsers().then((res) => {
      if (res.data == null) {
        this.props.history.push("/add-user/_add");
      }
      this.setState({ users: res.data });
    });
  }

  addUser() {
    this.props.history.push("/add-user/_add");
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Users List</h1>
        <div className="add">
          <button className="btn btn-primary" onClick={this.addUser}>
            {" "}
            Tambah data
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr style={{ margin: "0", border: "none" }}>
                <th>Judul Buku</th>
                <th>Jumlah Buku</th>
                <th>Nama Peminjam</th>
                <th>Alamat Peminjam</th>
                <th>No Hp Peminjam</th>
                <th>Tanggal Pinjam</th>
                <th>Tanggal Pengembalian</th>
                <th>Lama Pinjam</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.judul_buku}</td>
                  <td>{user.jumlah}</td>
                  <td>{user.nama_peminjam}</td>
                  <td>{user.alamat_peminjam}</td>
                  <td>{user.nohp_peminjam}</td>
                  <td>{user.tanggal_pinjam}</td>
                  <td>{user.tanggal_pengembalian}</td>
                  <td>{user.lama_pinjam}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <button 
                        style={{ width: "100%", marginBottom: "5px" }}
                        onClick={() => this.editUser(user.id)}
                        className="btn btn-primary"
                      >
                        Update
                      </button>

                      <button
                        style={{ width: "100%", marginBottom: "5px" }}
                        onClick={() => this.deleteUser(user.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>

                      <button
                        style={{ width: "100%" }}
                        onClick={() => this.viewUser(user.id)}
                        className="btn btn-info"
                      >
                        View
                      </button>
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListUserComponent;
