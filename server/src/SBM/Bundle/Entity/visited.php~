<?php

namespace SBM\Bundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\DateTime;

/**
 * visited
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class visited {
	/**
	 *
	 * @var integer @ORM\Column(name="id", type="integer")
	 *      @ORM\Id
	 *      @ORM\GeneratedValue(strategy="AUTO")
	 */
	private $id;
	
	/**
	 * @ORM\ManyToOne(targetEntity="user", inversedBy="visited")
	 * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
	 */
	protected $fk_user;
	
// 	/**
// 	 * @ORM\ManyToOne(targetEntity="links", inversedBy="visited")
// 	 * @ORM\JoinColumn(name="link_id", referencedColumnName="id")
// 	 */
// 	protected $fk_links;
	
// 	/**
// 	 * @var datetime
// 	 *
// 	 * @ORM\Column(name="timestamp", type="datetime")
// 	 */
// 	private $timestamp;
	
	/**
	 * @var string
	 *
	 * @ORM\Column(name="ip_addr", type="string", length=255)
	 */
	private $ip_addr;
	
	/**
	 * Get id
	 *
	 * @return integer
	 */
	public function getId() {
		return $this->id;
	}

    /**
     * Set fk_user
     *
     * @param \SBM\Bundle\Entity\user $fkUser
     * @return visited
     */
    public function setFkUser(\SBM\Bundle\Entity\user $fkUser = null)
    {
        $this->fk_user = $fkUser;

        return $this;
    }

    /**
     * Get fk_user
     *
     * @return \SBM\Bundle\Entity\user 
     */
    public function getFkUser()
    {
        return $this->fk_user;
    }

    /**
     * Set fk_links
     *
     * @param \SBM\Bundle\Entity\links $fkLinks
     * @return visited
     */
    public function setFkLinks(\SBM\Bundle\Entity\links $fkLinks = null)
    {
        $this->fk_links = $fkLinks;

        return $this;
    }

    /**
     * Get fk_links
     *
     * @return \SBM\Bundle\Entity\links 
     */
    public function getFkLinks()
    {
        return $this->fk_links;
    }

    /**
     * Set timestamp
     *
     * @param \DateTime $timestamp
     * @return visited
     */
    public function setTimestamp($timestamp)
    {
        $this->timestamp = $timestamp;

        return $this;
    }

    /**
     * Get timestamp
     *
     * @return \DateTime 
     */
    public function getTimestamp()
    {
        return $this->timestamp;
    }

    /**
     * Set ip_addr
     *
     * @param string $ipAddr
     * @return visited
     */
    public function setIpAddr($ipAddr)
    {
        $this->ip_addr = $ipAddr;

        return $this;
    }

    /**
     * Get ip_addr
     *
     * @return string 
     */
    public function getIpAddr()
    {
        return $this->ip_addr;
    }
}
