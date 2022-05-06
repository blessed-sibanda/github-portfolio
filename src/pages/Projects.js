import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "../components/List";

export default function Projects({ userName }) {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.github.com/users/${userName}/repos`
      );
      const result = await response.json();
      if (result) {
        setProjects(result);
        setLoading(false);
      }
    }
    fetchData();
  }, [userName]);

  return (
    <div className="Projects-container">
      <h2>Projects</h2>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <List
            items={projects.map((project) => ({
              field: project.name,
              value: (
                <Link to={"/projects/" + project.name}>{project.name}</Link>
              ),
            }))}
          />
        </div>
      )}
    </div>
  );
}
