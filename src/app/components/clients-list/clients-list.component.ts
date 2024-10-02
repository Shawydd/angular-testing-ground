import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Client, ClientService } from '../../services/client/client.service';
import { CryptoService } from '../../services/crypto/crypto.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.css'
})

export class ClientsListComponent implements OnInit {
  clients: Client[] = [];
  displayedColumns: string[] = ['id', 'codiceFiscale', 'nome', 'cognome',
    'dataDiNascita', 'azienda', 'modifica', 'elimina'];

  id: number = -1;
  isVisible: boolean = false;
  selectedClientId!: number | null;
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private clientService: ClientService, private crypto: CryptoService) {  //da aggiungere al costruttore gli altri valori tipo fb.group etc, vedere login.component.ts per info
    this.userForm = this.fb.group({
      codiceFiscale: ['', [Validators.required, Validators.minLength(4)]],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      dataDiNascita: ['', Validators.required],
      azienda: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('userId') ? parseInt(this.crypto.decrypt(sessionStorage.getItem('userId') as string)) : -1;
    this.getById(this.id);
  }

  findAll(): void {
    this.clientService.getClients().subscribe(
      (data: Client[]) => {
        this.clients = data;
      },
      (error) => {
        console.error('Errore recupero lista clienti', error);
      }
    );
  }

  getById(id: number): void {
    this.clientService.getById(id).subscribe(
      (data: Client[]) => {
        this.clients = data;
      },
      (error) => {
        console.log("Errore ", error);
      }
    )
  }

  onAddClient(): void {
    this.isVisible = true;
  }

  onSubmit(): void {
    if (this.userForm?.valid && this.selectedClientId == null) {

      this.userForm.value.dataDiNascita = this.userForm.value.dataDiNascita.toISOString().split('T')[0];

      const updateClient = { ...this.userForm.value, userId: this.id }
      this.clientService.addClient(updateClient).subscribe({
        next: (response) => {
          alert(`Cliente aggiunto con successo!`);
          this.isVisible = false;
          this.getById(this.id);
        },
        error: (error) => {
          console.log("Errore ", error);
        }
      });
    } else {
      const updateClient = { ...this.userForm.value, userId: this.id, id: this.selectedClientId }
      this.clientService.updateClient(updateClient).subscribe({
        next: (response) => {
          alert(`Cliente modificato con successo!`);
          this.isVisible = false;
          this.getById(this.id);
          this.selectedClientId = null;
        },
        error: (error) => {
          console.log("Errore ", error);
        }
      })
    }
  }

  onEdit(client: Client): void {
    this.isVisible = true;
    this.selectedClientId = client.id !== undefined ? client.id : null;
    this.userForm.patchValue({
      codiceFiscale: client.codiceFiscale,
      nome: client.nome,
      cognome: client.cognome,
      dataDiNascita: client.dataDiNascita,
      azienda: client.azienda
    });
  }

  onDelete(id: number): void {
    if (confirm('Confermare l\'eliminazione?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.clients = this.clients.filter(client => client.id !== id);
          alert('Utente eliminato')
        },
        error: (error) => {
          console.log("Errore ", error);
        }
      })
    }
  }
}
