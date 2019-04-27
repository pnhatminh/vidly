import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import GroupList from "./GroupList";
import MoviesTable from "./MoviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    currentGenre: { name: "All Genres", _id: "" },
    genres: [],
    movies: [],
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(item => item._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGroupListClick = genre => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      currentGenre,
      sortColumn
    } = this.state;
    const filtered =
      currentGenre && currentGenre._id
        ? allMovies.filter(m => m.genre.name === currentGenre.name)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      currentGenre,
      genres,
      sortColumn
    } = this.state;
    if (this.state.movies.length === 0)
      return <p>There are no movies in the database</p>;
    const { data } = this.getPageData();
    const count = !currentGenre._id ? this.state.movies.length : data.length;
    return (
      <div className="row">
        <div className="col-2">
          {" "}
          <GroupList
            genres={genres}
            currentGenre={currentGenre}
            onGenreChange={this.handleGroupListClick}
          />
        </div>
        <div className="col">
          <p>Showing {count} movies in the database.</p>
          <MoviesTable
            sortColumn={sortColumn}
            movies={data}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
