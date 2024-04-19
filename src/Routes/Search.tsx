import { useLocation } from "react-router";

function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    console.log(keyword);
    return (
        <>
        <h1>Search</h1>
        <h2>"{keyword}" 검색결과</h2>
        </>
    );
}
export default Search;
