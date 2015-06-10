<?php

namespace SBM\Bundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use SBM\Bundle\Entity\User;

use SBM\Bundle\Form\Type\RegistrationType;
use SBM\Bundle\Form\Model\Registration;

class AccountController extends Controller
{
    public function registerAction()
    {
        $form = $this->createForm(new RegistrationType(), new Registration());

        return $this->render('SBMBundle:Account:register.html.twig', array('form' => $form->createView()));
    }
}