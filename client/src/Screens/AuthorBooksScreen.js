const AuthorBooksScreen = () => {
  
  const booksArray = [];
  const bookRenderer = booksArray.map(x => <div>
    
  </div>)
  
  return (
    <div>
      {bookRenderer}
    </div>
  );
  
  // const dispatch = useDispatch();
  // const bookDetails = useSelector((state) => state.getBookDetails);
  // const { loading, error, book } = bookDetails;
  // useEffect(() => {
  //   if (book && (match.params.id) !== book._id) {
  //     dispatch(getBookDetails(match.params.id));
  //   }
  // }, [dispatch, book, match]);
}

export default AuthorBooksScreen;