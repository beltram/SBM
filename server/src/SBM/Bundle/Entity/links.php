<?php

namespace SBM\Bundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * links
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class links
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;
    
    /**
     * @var string
     *
     * @ORM\Column(name="base_url", type="string", length=255)
     */
    private $base_url;
    
    /**
     * @var string
     *
     * @ORM\Column(name="url", type="string", length=255)
     */
    private $url;
    
    /**
     * @var array
     *
     * @ORM\Column(name="keywords", type="array")
     */
    private $keywords;
    
    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;
    
    /**
     * @var integer
     *
     * @ORM\Column(name="nb_visits", type="integer")
     */
    private $nb_visits;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set base_url
     *
     * @param string $baseUrl
     * @return links
     */
    public function setBaseUrl($baseUrl)
    {
        $this->base_url = $baseUrl;

        return $this;
    }

    /**
     * Get base_url
     *
     * @return string 
     */
    public function getBaseUrl()
    {
        return $this->base_url;
    }

    /**
     * Set url
     *
     * @param string $url
     * @return links
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get url
     *
     * @return string 
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set keywords
     *
     * @param array $keywords
     * @return links
     */
    public function setKeywords($keywords)
    {
        $this->keywords = $keywords;

        return $this;
    }

    /**
     * Get keywords
     *
     * @return array 
     */
    public function getKeywords()
    {
        return $this->keywords;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return links
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set nb_visits
     *
     * @param integer $nbVisits
     * @return links
     */
    public function setNbVisits($nbVisits)
    {
        $this->nb_visits = $nbVisits;

        return $this;
    }

    /**
     * Get nb_visits
     *
     * @return integer 
     */
    public function getNbVisits()
    {
        return $this->nb_visits;
    }
}
