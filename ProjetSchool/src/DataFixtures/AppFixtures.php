<?php

namespace App\DataFixtures;

use App\Entity\Average;
use App\Entity\Classe;
use App\Entity\Note;
use App\Entity\Professor;
use App\Entity\Student;
use App\Entity\Subject;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Faker\Factory as Faker;


class AppFixtures extends Fixture
{

    private UserPasswordHasherInterface $encoder;

    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager): void
    {

        // Le directeur
        $directeur = (new User())->setLastname('Goldman')->setFirstname('Jean-Jacques')->setRoles(['Director']);
        $hashedPassword = $this->encoder->hashPassword($directeur, "popo");
        $directeur->setPassword($hashedPassword)->setEmail('directeur@directeur.fr');
        $manager->persist($directeur);

        // Les classes
        $cp = (new Classe())->setName("CP");
        $manager->persist($cp);

        $ce1 = (new Classe())->setName("CE1");
        $manager->persist($ce1);

        $classes = ['CE2', 'CM1', 'CM2'];
        $i = 0;
        foreach ($classes as $key => $classe) {
            $newClasse = (new Classe())->setName($classe);
            $manager->persist($newClasse);
        }

        // Le professeur

        $profCp = (new Professor())->setAge(23)->setSalary(1250)->setSeniority('1 an')->setClasse($cp);
        $hashedPassword = $this->encoder->hashPassword($profCp, "jd");
        $profCp->setPassword($hashedPassword)->setEmail('JeanDelenoix@cp.fr')->setLastname('Delenoix')->setFirstname('Jean')->setRoles(['Professor']);
        $manager->persist($profCp);

        $profCe1 = (new Professor())->setAge(23)->setSalary(1250)->setSeniority('1 an')->setClasse($ce1);
        $hashedPassword = $this->encoder->hashPassword($profCe1, "jb");
        $profCe1->setPassword($hashedPassword)->setEmail('JustineBekritch@ce1.fr')->setLastname('Bekritch')->setFirstname('Justine')->setRoles(['Professor']);
        $manager->persist($profCe1);

        // Elèves CP
        $faker = Faker::create('fr_FR');
        $gender = ['male', 'female'];

        for ($i = 0; $i < 15; $i++) {

            $cpStudent = (new Student())->setClasse($cp)->setSexe($faker->randomElement($gender));
            $hashedPassword = $this->encoder->hashPassword($cpStudent, "jd");
            $cpStudent->setPassword($hashedPassword)->setEmail($faker->email)->setLastname($faker->lastname)->setFirstname($faker->firstname)->setRoles(['Student']);
            $manager->persist($cpStudent);
        }

        for ($i = 0; $i < 15; $i++) {

            $ce1Student = (new Student())->setClasse($ce1)->setSexe($faker->randomElement($gender));
            $hashedPassword = $this->encoder->hashPassword($ce1Student, "jd");
            $ce1Student->setPassword($hashedPassword)->setEmail($faker->email)->setLastname($faker->lastname)->setFirstname($faker->firstname)->setRoles(['Student']);
            $manager->persist($ce1Student);
        }

        // Matiere
        $matieres = ['Histoire-Géographie', 'Français', 'Mathématiques', 'Sciences', 'Sport'];
        $i = 0;
        foreach ($matieres as $key => $matiere) {
            $subject = (new Subject())->setName($matiere);
            $manager->persist($subject);

            $this->addReference('subject' . $i++,  $subject);
        }
        // Note
        for ($i = 0; $i < 5; $i++) {
            $note = (new Note())->setRate(random_int(0, 20))->setStudent($cpStudent)->addSubject($this->getReference('subject' . $i));
            $manager->persist($note);
        }

        $manager->flush();
    }
}
