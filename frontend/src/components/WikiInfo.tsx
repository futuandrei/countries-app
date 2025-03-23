import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

interface WikiInfoProps {
  countryName: string;
}

const WikiInfo: React.FC<WikiInfoProps> = ({ countryName }) => {
  const [showWiki, setShowWiki] = useState(false);
  const [wikiData, setWikiData] = useState<{
    summary: string;
    image?: string;
    link: string;
  } | null>(null);

  const fetchWikipediaSummary = async (title: string) => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${title.replace(
          / /g,
          "_"
        )}`
      );
      const data = await res.json();
      return {
        summary: data.extract,
        image: data.thumbnail?.source,
        link: data.content_urls?.desktop?.page,
      };
    } catch (err) {
      console.error("Error fetching Wikipedia data:", err);
      return null;
    }
  };

  const handleExpandClick = async () => {
    if (!showWiki && !wikiData) {
      const wiki = await fetchWikipediaSummary(countryName);
      setWikiData(wiki);
    }
    setShowWiki((prev) => !prev);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Button variant="outlined" onClick={handleExpandClick}>
        {showWiki ? "Hide Wikipedia Info" : `Learn more about ${countryName}`}
      </Button>

      {showWiki && wikiData && (
        <Box mt={2}>
          <Typography variant="body1">{wikiData.summary}</Typography>
          {wikiData.image && (
            <img
              //   src={wikiData.image}
              //   alt={`${countryName} thumbnail`}
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          )}
          <Typography>
            <a href={wikiData.link} target="_blank" rel="noopener noreferrer">
              Read more on Wikipedia →
            </a>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default WikiInfo;
